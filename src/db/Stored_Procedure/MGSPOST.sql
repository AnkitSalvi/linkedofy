CREATE DEFINER=`root`@`localhost` PROCEDURE `MGSPOST`(
IN _user_license varchar(255),
IN _messages_template_id int,
IN _title varchar(255),
IN _body text,
IN _last_used date,
IN _saved boolean
)
BEGIN
 INSERT INTO messages_template(user_license,messages_template_id,title,body,last_used,saved)
    VALUES (_user_license,_messages_template_id,_title,_body,_last_used,_saved);
    
END