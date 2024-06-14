export async function GET() {
    const token = await getToken();
    if (token) {
        const apiData = await fetchData(token);
        return Response.json(apiData);
    } else {
        return Response.json(
            {error: 'Failed to retrieve access token'},
            {status: 401 }
            );
            }
        
    }


async function getToken() {
  const authurl = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";
  const params = new URLSearchParams();
  tokenParams.append('grant_type','client_credentials');
  tokenParams.append('client_id', clientId);
  tokenParams.append('client_secret', clientSecret);

    try {
        const response = await fetch(authUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'applicention/x-ww-form-urlencoded',
            },
            body: params,
        });

        if (response.ok){
            const data = await response.json();
            return data.access_token;
        }else{
            console.error("ERROR FETCHING TOKEN:" response.status);
        }
    }catch(error) {
        console.log("ERROR FETCHING token:", error);
    }

    return null;
}

    async function fetchData(token) {
        const apiUrl = "https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/YunlinCounty";

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    Authoriaztion: `Bearer' ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(JSON.stringify(data));
                return data;
            }else {
                console.error('Error frtching data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:',error);
        }

        return null;
    }

