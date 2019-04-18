import * as React from 'react';
import { mount } from 'enzyme';


import App from '../src/App';


describe('@theme/r-material:App', (): void => {
  it('# should mount App with empty route correctly', (): void => {
    const router = [];
    const wrapper = mount(<App router={router}/>);

    expect(wrapper.props().router).toEqual([]);
  });

  it('# should mount App with 1 route correctly', (): void => {
    const FixtureComponent = (): JSX.Element => (<div>Fixture</div>);

    const router = [
      {
        path: '/',
        component: FixtureComponent
      }
    ];

    const wrapper = mount(<App router={router}/>);
    expect(wrapper.props().router).toHaveLength(1);
  });
});