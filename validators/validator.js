var {check}  = require('express-validator');
var validationResult = require('express-validator');
const validatorMiddleware = require('../middlewares/validatorMW');
const express = require('express')
const rsql=require("../database/commitsql")

// exports.addcart = [
//   check('id')
//     .notEmpty()
//     .withMessage('ID is required')
//     .isInt()
//     .withMessage('ID must be an integer')
//     .custom(async (id) => {
//       const result1 = await rsql('SELECT COUNT(*) FROM product WHERE id = $1', [id]);
//       if (result1.rows[0].count === '0') {
//         throw new Error(' product ID not found');
//       }
//     }),
//   check('colorid')
//     .notEmpty()
//     .withMessage('ID is required')
//     .isInt()
//     .withMessage('ID must be an integer')
//     .custom(async (colorid) => {
//       const result2 = await rsql('SELECT COUNT(*) FROM color  WHERE id = $1', [colorid]);
//       if (result2.rows[0].count === '0') {
//         throw new Error(' color ID not found');
//       }
//     })
//    /* 
//    .custom(async (id, colorid) => {
//       const result3 = await rsql('SELECT COUNT(*) FROM color  WHERE product_id = $1 and id=$2', [id, colorid]);
//       if (result3.rows[0].count === '0') {
//         throw new Error('this color not available for this product');
//       }
//     })*/,
//   validatorMiddleware
// ];
  

// exports.image= [
//   check('id')
//     .notEmpty()
//     .withMessage('ID is required')
//     .isInt()
//     .withMessage('ID must be an integer')
//     .custom(async (id) => {
//       const result = await rsql('SELECT COUNT(*) FROM image WHERE id = $1', [id]);
//       if (result.rows[0].count === '0') {
//         throw new Error('ID not found');
//       }
//     }),
//     validatorMiddleware
//   ]
// exports.productdetail= [
//   check('id')
//     .notEmpty()
//     .withMessage('ID is required')
//     .isInt()
//     .withMessage('ID must be an integer')
//     .custom(async (id) => {
//       const result = await rsql('SELECT COUNT(*) FROM product WHERE id = $1', [id]);
//       if (result.rows[0].count === '0') {
//         throw new Error('ID not found');
//       }
//     }),
//     validatorMiddleware
//   ]
// exports.showsubcategprodut= [
//   check('id')
//     .notEmpty()
//     .withMessage('ID is required')
//     .isInt()
//     .withMessage('ID must be an integer')
//     .custom(async (id) => {
//       const result = await rsql('SELECT COUNT(*) FROM "subCategory" WHERE id = $1', [id]);
//       if (result.rows[0].count === '0') {
//         throw new Error('ID not found');
//       }
//     }),

//   check('limit')
//     .optional()
//     .isInt({ min: 1 })
//     .withMessage('Limit must be a positive integer'),

//   check('page')
//     .optional()
//     .isInt({ min: 1 })
//     .withMessage('Page must be a positive integer'),

//   validatorMiddleware
// ]
exports.signupValidator = [
  check('name')
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 3 })
    .withMessage('Full name must be at least 3 characters'),

    check('id')
    .notEmpty()
    .withMessage('ID is required')
    .isInt()
    .withMessage('ID must be an integer')
    .custom(async (id) => {
      const result = await rsql('SELECT "idKey" FROM users WHERE "idKey" = $1', [id]);
      if (result.rows[0]) {
        throw new Error('ID is already exist enter a correct id key');
      }
    }),


  check('Email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    
      ,
      check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/\d/)
    .withMessage('Password must contain at least one digit')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*()_+=\-[\]{}|\\:;"',.<>/?]/)
    .withMessage('Password must contain at least one special character')
    .custom((value) => {
      
      if (value === 'password123') {
        throw new Error('Password is too weak');
      }
      return true;
    }),


    
     
     
     validatorMiddleware
    
    ]
// exports.v=[

// check('rank').notEmpty().withMessage('empity')
// , validatorMiddleware
// ];