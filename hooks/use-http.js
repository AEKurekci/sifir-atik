export const HOST = 'http://192.168.0.13';
export const defaultHeader = {"Content-Type": "application/json"};

const useHttp = async (path, port, method = 'GET', headers = defaultHeader, body = undefined, host = HOST) => {
    console.log(host + ':' + port + '/' + path)
    console.log(body)
    const response = await fetch(host + ':' + port + '/' + path, {
        method,
        headers,
        body
    })
    if(!response.ok){
        throw new Error('Unable to fetch data :(')
    }
    return await response.json();
}

export default useHttp;