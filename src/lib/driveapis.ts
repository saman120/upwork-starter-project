function handleResponse(res: any) {
  if (res.ok) return res.json()
  else if (res.status === 400) throw new Error('Bad Request')
  else if (res.status === 403) throw new Error('Unauthorised')
  else throw Error(res.statusText)
}

const redirectUri = 'http://localhost:3000'
const clientSecret = 'wZtNvVC9YmxSCBB61AhEjFpj'
const clientId =
  '818757178082-rh47f1isl4q9kvdfaobqrfukg094if7j.apps.googleusercontent.com'

const scope = 'https://www.googleapis.com/auth/drive'

export const fetchToken = (paramCode: string) => {
  const formData = new FormData()
  formData.append('code', paramCode)
  formData.append('redirect_uri', redirectUri)
  formData.append('client_secret', clientSecret)
  formData.append('client_id', clientId)
  formData.append('scope', scope)
  formData.append('grant_type', 'authorization_code')

  return new Promise<string>((resolve) => {
    fetch('https://www.googleapis.com/oauth2/v4/token', {
      method: 'post',
      body: formData
    })
      .then(handleResponse)
      .then((resultData: { access_token: string }) => {
        resolve(resultData.access_token)
      })
      .catch((resError) => {
        alert(resError)
        throw new Error()
      })
  })
}

export const googleAuth = () => {
  const url =
    'https://accounts.google.com/o/oauth2/v2/auth' +
    '?redirect_uri=' +
    redirectUri +
    '&prompt=consent&response_type=code&client_id=' +
    clientId +
    '&scope=' +
    scope +
    '&access_type=offline'

  window.location.replace(url)
}

export const uploadFile = (
  authToken: string,
  controller: AbortController,
  file: File,
  fileId: string | undefined
) => {
  const { signal } = controller

  const url =
    'https://www.googleapis.com/upload/drive/v2/files' +
    (fileId ? '/' + fileId : '')

  const formData = new FormData()
  formData.append('file', file, file.name)
  formData.append('upload_file', 'true')

  return new Promise<string>((resolve) => {
    fetch(url, {
      signal,
      method: fileId ? 'PUT' : 'POST',
      body: formData,
      headers: {
        Authorization: 'Bearer ' + authToken
      }
    })
      .then(handleResponse)
      .then((rJson: { id: string }) => {
        resolve(rJson.id)
      })
      .catch((err) => alert(err))
  })
}
