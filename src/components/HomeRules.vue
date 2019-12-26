<template>
  <div class="collapse-holder">
    <collapse :selected="false">
      <div slot="collapse-header">Information</div>
      <div slot="collapse-body">
        <ul>
          <li>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
            perferendis numquam iusto.
          </li>
          <li>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
            ipsa fuga facere sequi debitis nostrum voluptates quas amet laborum,
            voluptatum assumenda sunt similique harum quidem error illo ipsum
            eius dolore?
          </li>
          <li>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
            perferendis numquam iusto.
          </li>
          <li>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
            perferendis numquam iusto.
          </li>
          <li>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
            perferendis numquam iusto.
          </li>
        </ul>
      </div>
    </collapse>
  </div>
</template>

<script>
import Collapse from "vue-collapse";
export default {
  name: "HomeRules",
  components: {
    Collapse
  }
};
</script>

<style></style>
