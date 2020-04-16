CREATE DEFINER=`root`@`localhost` PROCEDURE `ACTIVITYADD`(
IN _user_license varchar(255),
IN _batch_id int,
IN _activity_date date,
IN _module ENUM('auto_connect','broadcast','auto_visit and follow','endorse my contacts','remove connections','withdraw invites','create contact list'),
IN _pages ENUM('search_page','sales_navigator'),
IN _activity_status ENUM('sent','skipped','failed')

)
BEGIN

INSERT INTO activity(user_license,batch_id,activity_date,module,pages,status)
VALUES (_user_license,_batch_id,_activity_date,_module,_pages,_activity_status);

END