CREATE DEFINER=`root`@`localhost` PROCEDURE `AUTOCONNECTGET`(
IN _license varchar(255)
)
BEGIN
	SELECT user_license,profile_url,withdrawn from autoconnect WHERE user_license = _license;
END