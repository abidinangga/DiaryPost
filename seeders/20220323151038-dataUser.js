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
    const data=fs.readFileSync('./user.json','utf8');
    const dataUser=JSON.parse(data);
    dataUser.map(el =>{
      el.createdAt=new Date();
      el.updatedAt=new Date();
      return el
    })
    return queryInterface.bulkInsert('Users', dataUser, {});
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Users', null, {});
  }
};
