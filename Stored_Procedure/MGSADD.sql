CREATE DEFINER=`root`@`localhost` PROCEDURE `MGSADD`(
IN _user_license varchar(255),
IN _message_id int,
IN _title varchar(255),
IN _body text,
IN _last_used date,
IN _saved boolean,
IN _category ENUM('message','inmail')
)
BEGIN
    
    INSERT INTO messages(user_license,message_id,title,body,last_used,saved,category)
    VALUES (_user_license,_message_id,_title,_body,_last_used,_saved,_category);
    
END