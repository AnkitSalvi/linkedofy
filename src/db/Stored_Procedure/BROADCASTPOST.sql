CREATE DEFINER=`root`@`localhost` PROCEDURE `BROADCASTPOST`(
IN _user_license varchar(255),
IN _campaign_id int,
IN _messages_template_id int,
IN _profile_url varchar(255),
IN _mgs_status ENUM('sent','skipped','failed')
)
BEGIN

INSERT INTO broadcast(user_license,campaign_id,messages_template_id,profile_url,status)
VALUES (_user_license,_campaign_id,_messages_template_id,_profile_url,_mgs_status);

END