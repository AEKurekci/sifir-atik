export const HOST = 'http://192.168.0.13';

const useHttp = async (path, port, method = 'GET', headers= {"Content-Type": "application/json"}, body = undefined) => {
    console.log(path)
    const response = await fetch(HOST + ':' + port + '/' + path, {
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