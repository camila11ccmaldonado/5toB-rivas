
const mySql = require("mysql2/promise");

/**configuración de la base de datos MySQL a utilizar. */
const SQL_CONFIGURATION_DATA =
{
	host: "10.1.5.205",
	user: "2024-5BINF-G02",
	password: "iconic",
	database: "2024-5BINF-G02",
	port: 3306,
	charset: 'UTF8_GENERAL_CI'
}

exports.realizarQuery = async function (queryString)
{
	let returnObject;
	let connection;
	try
	{
		connection = await mySql.createConnection(SQL_CONFIGURATION_DATA);
		returnObject = await connection.execute(queryString);
	}
	catch(err)
	{
		console.log(err);
	}
	finally
	{
		if(connection && connection.end) connection.end();
	}
	return returnObject[0];
}