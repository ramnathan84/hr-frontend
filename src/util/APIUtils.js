const API_BASE_URL="http://localhost:5000/api";

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        
    })
    
    

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};


export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function getEmployeeById(id) {
    return request({
        url: API_BASE_URL + "/allEmployees/" + id,
        method: 'GET'
    });
}

export function getEmployees() {

    return request({
        url: API_BASE_URL + "/allEmployees",
        method: 'GET'
    });
}

export function login(loginRequest) {
    console.log("Login : " ,loginRequest)
    return request({
        url: API_BASE_URL + "/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}




