CREATE DEFINER=`root`@`localhost` PROCEDURE `BROADCASTGET`(
IN _license varchar(255)
)
BEGIN
	
    select m.user_license,m.title,m.body,m.last_used,ms.profile_url,ms.status
    FROM messages_template AS m
    JOIN broadcast AS ms
    ON m.messages_template_id = ms.messages_template_id
    WHERE m.user_license = _license;
    
END