CREATE DEFINER=`root`@`localhost` PROCEDURE `CAMPAIGNPOST`(
IN _user_license varchar(255),
IN _campaign_id int,
IN _campaign_date date,
IN _module ENUM('auto_connect','broadcast','auto_visit and follow','endorse my contacts','remove connections','withdraw invites','create contact list'),
IN _pages ENUM('search_page','sales_navigator'),
IN _campaign_status ENUM('sent','skipped','failed')
)
BEGIN

INSERT INTO campaign(user_license,campaign_id,campaign_date,module,pages,status)
VALUES (_user_license,_campaign_id,_campaign_date,_module,_pages,_campaign_status);

END