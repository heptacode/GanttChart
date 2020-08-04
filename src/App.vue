<template>
  <v-app>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto commodi voluptas ipsam nisi ipsa vitae illum deserunt, molestias ullam enim suscipit tempora omnis quaerat, quasi culpa
    nesciunt ipsum adipisci? Tempora nam dolore nemo inventore. Veniam incidunt ea magnam sapiente, vero fugit eveniet nam animi cum illo perferendis rem quasi molestiae aliquid dicta. Quod sint,
    quibusdam, ipsam nulla saepe nostrum ratione dolore laboriosam voluptate placeat porro? Hic impedit ab rerum, totam id voluptate fuga deserunt a nihil ratione? At exercitationem recusandae
    quisquam, aspernatur minus, facilis voluptates sequi sed expedita nam beatae sapiente doloremque nostrum magnam repellendus animi! Voluptatibus veniam quibusdam sunt?
    <!-- <v-app-bar fixed color="indigo darken-4" dark>
      <v-toolbar-title>GanttChart</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>
    <v-container style="margin-top:100px">
      <v-card class="d-flex">
        <v-slider v-model="maxTerm" color="indigo" min="1" max="90" label="maxTerm"></v-slider>
        <div>{{ maxTerm }}일</div>
      </v-card>
      <div v-for="(item, idx) in items" :key="idx">
        {{ item.name }}
        <div>{{ item.term }}</div>
      </div>
      <v-btn icon @click="add"><v-icon>mdi-plus</v-icon></v-btn>
    </v-container> -->
  </v-app>
</template>

<script lang="ts">
import { GanttItem } from "./models";

import { PropType } from "vue";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  maxTerm = 30;
  @Prop({ type: Array as PropType<GanttItem[]> }) items: GanttItem[] = [{ name: "테스트", term: 1 }];
  add() {
    this.items.push({ name: "", term: 1 });
  }
  del(idx: number) {
    if (this.items.length > 1) this.items.splice(idx, 1);
  }
}
</script>

<style lang="scss">
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);
* {
  margin: 0 !important;
  padding: 0 !important;
  border: 0;
  box-sizing: border-box;
  font-family: "Spoqa Han Sans";

  font-size: 1em;
}
// *::selection {
//   background-color: $select-color;
// }
html {
  // background-color: $background-color;
  // color: $text-color;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  word-break: keep-all;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // overflow-x: hidden;
  // overflow-y: auto;
}
body {
  width: 105%;
  overflow: hidden;
}
v-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 105vw;
}
</style>
