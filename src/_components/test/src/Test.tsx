import { defineComponent, ref, h } from 'vue'

export default defineComponent({
  name: 'Test',
  setup () {
    const count = ref(1)
    const handleClick = (): void => {
      count.value++
    }
    return {
      count,
      handleClick
    }
  },
  render () {
    return (
      <div>
        这是个测试{this.count}
        <button onClick={this.handleClick}>点击增加</button>
      </div>
    )
  }
})
