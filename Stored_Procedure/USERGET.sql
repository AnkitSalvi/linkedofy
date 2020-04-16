CREATE DEFINER=`root`@`localhost` PROCEDURE `USERGET`(
IN _license varchar(255)
)
BEGIN
	SELECT profile_url,withdrawn from invites WHERE user_license = _license;
END