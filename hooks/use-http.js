export const HOST = 'http://10.76.202.57';

const useHttp = async (path, port, method = 'GET', headers= {"Content-Type": "application/json"}, body = undefined) => {
    console.log(path)
    const response = await fetch(HOST + ':' + port + '/' + path, {
        method,
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body
    })
    if(!response.ok){
        throw new Error('Unable to fetch data :(')
    }
    const data = await response.json();
    return data;
}

export default useHttp;