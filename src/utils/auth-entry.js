export const authEndpoint = 'https://accounts.spotify.com/authorize';
export const redirectUri = 'http://localhost:3000/';
export const clientId = '4b69df84c5df4a6b9378d28c996ca783';
// export const clientSecret = '80982f9c61d6462291425536567e2867';

export const scopes = [
    'user-top-read'
    

];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;


export const getToken = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);

            return initial;
        }, {})
}