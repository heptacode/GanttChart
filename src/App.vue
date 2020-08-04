<template>
  <v-app dark oncontextmenu="return false">
    <v-app-bar fixed color="indigo darken-4" dark>
      <v-toolbar-title>GanttChart</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="pushTasks">
        <v-icon>mdi-calendar-plus</v-icon>
      </v-btn>
      <v-btn icon @click="fillFavorites">
        <v-icon>mdi-calendar-star</v-icon>
      </v-btn>
      <v-btn icon @click="replaceTasks">
        <v-icon>mdi-calendar-refresh</v-icon>
      </v-btn>
      <v-btn icon @click="deleteTasks">
        <v-icon>mdi-calendar-remove</v-icon>
      </v-btn>
      <v-btn icon href="https://github.com/heptacode/GanttChart">
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container v-if="windowWidth > 750">
      <v-sheet v-if="!tasks.length" class="mt-5 text-h2 text-center">
        Woohoo, no work to do!
        <v-img src="https://s.starladder.com/uploads/team_logo/6/3/0/e/thumb_270_c799626b431b7a56207be0d3d3a004ad.jpg" alt="Woohoo" aspect-ratio="2.5" contain></v-img>
      </v-sheet>
      <v-row v-else>
        <v-col cols="1"></v-col>
        <v-col v-for="i in 11" :key="i" cols="1" class="elevation-1 text-center">{{ i }}일</v-col>
      </v-row>
      <v-row v-for="(item, idx) in tasks" :key="idx" class="d-flex align-center justify-center text-center">
        <v-col cols="1" class="elevation-1 text-center pointer" @click="edit(idx)" @contextmenu="del(idx)">{{ item.name }}</v-col>
        <v-col v-if="item.blank" :cols="item.blank" class="d-block"></v-col>
        <v-col :cols="item.term" class="d-block lighten-4 elevation-3 pointer" :class="barColor(idx)" @click="edit(idx)" @contextmenu="del(idx)">{{ item.term }}일</v-col>
        <v-col v-if="item.blank + item.term != 11"></v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-sheet class="mt-5 text-h4 text-center">
        화면이 너무 좁아요. 가로로 기울여보세요!
        <v-icon class="mt-5 d-block" x-large>mdi-phone-rotate-landscape</v-icon>
      </v-sheet>
    </v-container>
    <v-btn fixed bottom right fab color="indigo" dark @click="add"><v-icon>mdi-plus</v-icon></v-btn>
    <!-- Dialog -->

    <v-dialog v-model="dialog" :persistent="method == 2 && !task.name.trim()" max-width="600px">
      <v-card>
        <form action="javascript:void(0)" @submit="submit">
          <v-card-title>
            <span class="headline">{{ method == 1 ? "추가" : "편집" }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="task.name" label="이름" required></v-text-field>
                </v-col>
                <v-col cols="10">
                  <v-slider v-model="task.blank" color="indigo" min="0" max="10" label="공백"></v-slider>
                </v-col>
                <v-col cols="2"> {{ task.blank }}일 </v-col>
                <v-col cols="10">
                  <v-slider v-model="task.term" color="indigo" min="1" max="11" label="기간"></v-slider>
                </v-col>
                <v-col cols="2"> {{ task.term }}일 </v-col>
              </v-row>
              <v-alert v-if="alert" type="error">
                태스크의 기간은 공백과 기간을 포함하여 총 11일을 초과하지 않아야 합니다.
              </v-alert>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="method == 2" color="red darken-1" text type="reset" @click="del">삭제</v-btn>
            <v-btn color="blue darken-1" text type="reset" @click="dialog = false">닫기</v-btn>
            <v-btn v-if="method == 1" color="blue darken-1" text type="submit">승인</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import { GanttTask } from "./models";

import { PropType } from "vue";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  windowWidth = window.innerWidth;
  dialog = false;
  method = 1;
  alert = false;
  task = { name: "", blank: 0, term: 1 };
  idx = 0;

  @Prop({ type: Array as PropType<GanttTask[]>, required: true, default: () => [] }) tasks!: GanttTask[];

  @Watch("task.blank")
  isBlankChanged() {
    if (this.task.blank + this.task.term > 11) this.alert = true;
    else this.alert = false;
  }
  @Watch("task.term")
  isTermChanged() {
    if (this.task.blank + this.task.term > 11) this.alert = true;
    else this.alert = false;
  }
  @Watch("dialog")
  isDialogChanged() {
    if (this.dialog == false) {
      this.task = { name: "", blank: 0, term: 1 };
    }
  }

  created() {
    this.fillFavorites();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  }

  onResize() {
    this.windowWidth = window.innerWidth;
  }

  barColor(idx: number) {
    if ((idx + 1) % 16 == 1) return "red";
    else if ((idx + 1) % 16 == 2) return "pink";
    else if ((idx + 1) % 16 == 3) return "purple";
    else if ((idx + 1) % 16 == 4) return "deep-purple";
    else if ((idx + 1) % 16 == 5) return "indigo";
    else if ((idx + 1) % 16 == 6) return "blue";
    else if ((idx + 1) % 16 == 7) return "light-blue";
    else if ((idx + 1) % 16 == 8) return "cyan";
    else if ((idx + 1) % 16 == 9) return "teal";
    else if ((idx + 1) % 16 == 10) return "green";
    else if ((idx + 1) % 16 == 11) return "light-green";
    else if ((idx + 1) % 16 == 12) return "lime";
    else if ((idx + 1) % 16 == 13) return "yellow";
    else if ((idx + 1) % 16 == 14) return "amber";
    else if ((idx + 1) % 16 == 15) return "orange";
    else return "brown";
  }

  add() {
    this.method = 1;
    this.dialog = true;
  }

  edit(idx: number) {
    this.method = 2;
    this.task = this.tasks[idx];
    this.idx = idx;
    this.dialog = true;
  }

  del(idx: number | null) {
    this.tasks.splice(idx || this.idx, 1);
    this.dialog = false;
  }

  submit() {
    if (this.task.name.trim() && this.task.blank + this.task.term <= 11) {
      this.tasks.push(this.task);
      this.dialog = this.alert = false;
    }
  }

  pushTasks() {
    this.tasks.push(
      { name: "기획", blank: 0, term: 1 },
      { name: "설계", blank: 1, term: 1 },
      { name: "개발", blank: 2, term: 4 },
      { name: "테스트", blank: 6, term: 3 },
      { name: "보고서", blank: 9, term: 2 }
    );
  }

  fillFavorites() {
    this.tasks.push(
      { name: "작업 1", blank: 0, term: 4 },
      { name: "작업 2", blank: 3, term: 5 },
      { name: "작업 3", blank: 5, term: 4 },
      { name: "작업 4", blank: 2, term: 3 },
      { name: "작업 5", blank: 4, term: 2 },
      { name: "작업 6", blank: 5, term: 3 },
      { name: "작업 7", blank: 3, term: 4 },
      { name: "작업 8", blank: 3, term: 2 },
      { name: "작업 9", blank: 2, term: 6 },
      { name: "작업10", blank: 5, term: 3 },
      { name: "작업11", blank: 6, term: 4 },
      { name: "작업12", blank: 8, term: 1 },
      { name: "작업13", blank: 5, term: 3 },
      { name: "작업14", blank: 3, term: 3 },
      { name: "작업15", blank: 4, term: 4 },
      { name: "작업16", blank: 7, term: 3 },
      { name: "작업17", blank: 9, term: 2 }
    );
  }

  replaceTasks() {
    this.tasks.splice(0, this.tasks.length);
    this.tasks.push(
      { name: "기획", blank: 0, term: 1 },
      { name: "설계", blank: 1, term: 1 },
      { name: "개발", blank: 2, term: 4 },
      { name: "테스트", blank: 6, term: 3 },
      { name: "보고서", blank: 9, term: 2 }
    );
  }

  deleteTasks() {
    this.tasks.splice(0, this.tasks.length);
  }
}
</script>

<style lang="scss">
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);
* {
  margin: 0;
  padding: 0;

  box-sizing: border-box;
  font-family: "Spoqa Han Sans";

  font-size: 1em;
}

html {
  width: 100%;
  height: 100vh;
  word-break: keep-all;
  user-select: none;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  overflow-x: hidden;
  overflow-y: auto;
}

v-container {
  margin-top: 60px;
}

.pointer {
  cursor: pointer;
}
</style>
