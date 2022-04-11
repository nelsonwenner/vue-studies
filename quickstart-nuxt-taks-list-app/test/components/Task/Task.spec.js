import { mount } from '@vue/test-utils'
import Task from '@/components/Task/index.vue'

describe('The Task component', () => {
  let wrapper = null
  let props = null

  const createProps = (newProps = {}) => ({
    content: 'Learn Vue.js 3',
    done: false,
    ...newProps
  })

  describe('when props is valid', () => {
    beforeEach(() => {
      props = createProps()
      wrapper = mount(Task, {
        propsData: {
          task: props
        }
      })
    })

    it('complete a todo', () => {
      props = createProps({ done: true })
      wrapper = mount(Task, {
        propsData: {
          task: props
        }
      })

      expect(wrapper.find('[data-test="todo"]').classes()).toContain('is-complete')
      expect(wrapper.find('[data-test="todo-buttons"]').findAll('button').at(0).text()).toBe('Undo')
    })

    it('does not complete a todo', () => {
      expect(wrapper.find('[data-test="todo"]').classes()).not.toContain('is-complete')
      expect(wrapper.find('[data-test="todo-buttons"]').findAll('button').at(0).text()).toBe('Done')
    })

    it('render props.content when passed', () => {
      expect(wrapper.find('[data-test="todo-content"]').text()).toBe('Learn Vue.js 3')
    })
  })
})
