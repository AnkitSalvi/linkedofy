CREATE DEFINER=`root`@`localhost` PROCEDURE `MGSGET`(
IN _license varchar(255)
)
BEGIN
	select m.user_license,m.title,m.body,m.last_used,ms.profile_url,ms.status
    FROM messages AS m
    JOIN message_sent AS ms
    ON m.message_id = ms.message_id
    WHERE m.user_license = _license;

END