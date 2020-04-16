CREATE DEFINER=`root`@`localhost` PROCEDURE `USERDELETE`(
	IN _license varchar(255),
    IN _profile_url varchar(255)
)
BEGIN
	DELETE FROM invites WHERE profile_url = _profile_url AND user_license = _license;
END