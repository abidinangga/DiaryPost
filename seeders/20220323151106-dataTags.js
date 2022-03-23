'use strict';
const fs=require('fs');
module.exports = {
   up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const data=fs.readFileSync('./tag.json','utf8');
     const dataUser=JSON.parse(data);
     dataUser.map(el =>{
       el.createdAt=new Date();
       el.updatedAt=new Date();
       return el
     })
     return queryInterface.bulkInsert('Tags', dataUser, {});
    
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkInsert('Tags', null, {});
  }
};
