CREATE DEFINER=`root`@`localhost` PROCEDURE `MGSSENTADD`(
IN _user_license varchar(255),
IN _batch_id int,
IN _message_id int,
IN _profile_url varchar(255),
IN _mgs_status ENUM('sent','skipped','failed')
)
BEGIN

INSERT INTO message_sent(user_license,batch_id,message_id,profile_url,status)
VALUES (_user_license,_batch_id,_message_id,_profile_url,_mgs_status);
        
END