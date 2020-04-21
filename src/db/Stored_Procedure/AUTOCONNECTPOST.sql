CREATE DEFINER=`root`@`localhost` PROCEDURE `AUTOCONNECTPOST`(
IN _user_license varchar(255),
IN _campaign_id int,
IN _profile_url varchar(255),
IN _last_updated date,
IN _withdrawn bool
)
BEGIN
	
    INSERT INTO autoconnect(user_license,campaign_id,profile_url,last_updated,withdrawn)
	VALUES (_user_license,_campaign_id,_profile_url,_last_updated,_withdrawn);
    
END