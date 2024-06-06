export const handleGithubLogin = async () => {
    window.location.assign(
        `${process.env.REACT_APP_FETCH_URL}/api/sessions/github`
    );
};
