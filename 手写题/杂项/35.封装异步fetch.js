async function myFetchAsync(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
