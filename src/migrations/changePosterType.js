module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Phim', 'poster', {
                type: Sequelize.BLOB,
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Phim', 'poster', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    }
};