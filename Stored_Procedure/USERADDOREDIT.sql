CREATE DEFINER=`root`@`localhost` PROCEDURE `USERADDOREDIT`(
IN _license varchar(255),
IN _name varchar(255),
IN _email VARCHAR(255),
IN _expiry date,
IN _plan enum('trial','enterprise')
)
BEGIN

	INSERT INTO users(license,name,email,expiry,plan)
    VALUES (_license,_name,_email,_expiry,_plan);
    
END