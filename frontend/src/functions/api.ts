export const apiPath = 'http://127.0.0.1:8840';

export const apiGetAllEntries = async () => {
  const url = apiPath+'/api/entry';
  const entries = await (await fetch(url)).json();

  return entries;
};

