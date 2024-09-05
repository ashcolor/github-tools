<script setup lang="ts">
const sortTypes = [
  {
    label: "一致順",
    value: "default",
  },
  {
    label: "スター数",
    value: "stars",
  },
  {
    label: "フォーク数",
    value: "forks",
  },
];
const sort = ref<string>("stars");

const searchWord = ref<string>("vue");

const repositories = ref<Array<Object>>([]);
const contents = ref<Array<any>>([]);

function countFiles(files: Array<Object>): Array<any> {
  const countArray = new Array<Object>();

  for (const file of files) {
    if (countArray.hasOwnProperty(file.name)) {
      const count = countArray[file.name]["count"];
      countArray[file.name]["count"] = count + 1;
    } else {
      countArray[file.name] = {
        name: file.name,
        type: file.type,
        count: 1,
      };
    }
  }

  return Object.values(countArray);
}

const onClickSearchButton = async () => {
  repositories.value = await getTopStarredRepositories({
    q: searchWord.value,
    sort: sort.value,
    per_page: 20,
  });

  const promises = repositories.value.map((repository: any) =>
    getRootDirectoryContents(repository.owner.login, repository.name)
  );

  const results = await Promise.all(promises);

  let allFiles: string[] = [];

  for (const files of results) {
    allFiles = allFiles.concat(files);
  }

  const fileCounts = countFiles(allFiles);

  const sortedFiles = fileCounts.sort((a, b) => b["count"] - a["count"]);

  contents.value = Object.values(sortedFiles);
};
</script>

<template>
  <h1>GitHub</h1>
  <button class="btn" @click="onClickSearchButton()">検索</button>
  <div class="form-control w-full max-w-xs">
    <input
      v-model="searchWord"
      type="text"
      placeholder="Type here"
      class="input input-bordered w-full max-w-xs"
    />
  </div>
  <div class="form-control w-full max-w-xsv flex flex-row">
    <div v-for="sortType in sortTypes" class="form-control">
      <label class="label cursor-pointer">
        <input
          v-model="sort"
          :value="sortType.value"
          type="radio"
          name="radio-10"
          class="radio checked:bg-red-500"
        />
      </label>
      <span class="label-text">{{ sortType.label }}</span>
    </div>
  </div>
  <div class="container">
    <div>
      <table class="table table-compact w-full">
        <thead>
          <tr>
            <th>ファイル名</th>
            <th>件数</th>
          </tr>
        </thead>
        <tr v-for="content in contents">
          <td>
            <BarGraph
              :label="content.name"
              :count="content.count"
              :rate="content.count / 5"
            ></BarGraph>
          </td>
        </tr>
      </table>
    </div>
  </div>
  <ul>
    <li v-for="repository in repositories">
      <a :href="repository.url">
        {{ repository.full_name }}
      </a>
    </li>
  </ul>
</template>
