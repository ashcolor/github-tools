const accessToken = "";

export const getTopStarredRepositories = async (
  params: Object
): Promise<any> => {
  const searchParams = new URLSearchParams(params);

  try {
    const response = await $fetch(
      `${GITHUB_API_ENDPOINT}/search/repositories?${searchParams}&order=desc&`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      }
    );

    return response.items;
  } catch (error) {
    console.error("Failed to retrieve top starred repositories:", error);
    return [];
  }
};

// リポジトリのルートディレクトリにあるファイルのファイル名を取得する関数
export const getRootDirectoryContents = async (
  owner: string,
  repo: string
): Promise<Array<Object>> => {
  try {
    const response = await $fetch(
      `${GITHUB_API_ENDPOINT}/repos/${owner}/${repo}/contents/`,
      {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(
      `Failed to retrieve files for repository ${owner}/${repo}:`,
      error
    );
    return [];
  }
};
