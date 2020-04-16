CREATE DEFINER=`root`@`localhost` PROCEDURE `INVITEADD`(
IN _user_license varchar(255),
IN _batch_id int,
IN _profile_url varchar(255),
IN _last_updated date,
IN _withdrawn bool
)
BEGIN
    
	INSERT INTO invites(user_license,batch_id,profile_url,last_updated,withdrawn)
	VALUES (_user_license,_batch_id,_profile_url,_last_updated,_withdrawn);
END