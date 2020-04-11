<template>
  <div>
    <div v-if="name === 'admin'" class="system">
      <p>{{text}}</p>
    </div>
    <div v-else class="wrap">
      <div class="message" :class="{owner}">
        <small v-if="!owner"><strong>{{name}}</strong></small>
        <p>{{text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "message",
        props: {
            name: String,
            text: String,
            owner: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>
  .system {
    margin-bottom: 1rem;
    p {
      margin-bottom: 1rem;
      text-align: center;
    }
  }

  .wrap {
    display: flex;
    flex-direction: column;
  }

  .message {
    padding: 0.5rem 1rem 0.5rem 1rem;
    max-width: 80%;
    margin: 0 1rem 1rem 0;
    box-shadow: 1px 1px 1px 0 rgba(50, 50, 50, 0.3);
    border-radius: 25px;
    background: #1976d2;
    position: relative;
    align-self: flex-start;

    p {
      margin-bottom: 0;
    }
  }

  .owner {
    background: #232323;
    color: #ffffff;
    align-self: flex-end;
  }
</style>
