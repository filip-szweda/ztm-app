import { shallowMount } from '@vue/test-utils';
import RegisterComponent from '@/components/RegisterComponent.vue';

describe('RegisterComponent', () => {
  let wrapper;
  let mockSubmit;

  beforeEach(() => {
    window.alert = jest.fn();
    mockSubmit = jest.fn();
    wrapper = shallowMount(RegisterComponent, {
      methods: { register: mockSubmit }
    });
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('has email and password input fields', () => {
    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');
    expect(emailInput.exists()).toBeTruthy();
    expect(passwordInput.exists()).toBeTruthy();
  });
});
