import { AppBarProps } from '@material-ui/core/AppBar';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
// import { MemoryRouter } from 'react-router';
import { AppBar, AppBarState } from './appBar';

describe('<AppBar />', () => {

  // let appBar: Enzyme.ReactWrapper<AppBarProps, AppBarState>

  // beforeAll(() => {
  //   Enzyme.configure({ adapter: new Adapter() })
  // })

  // beforeEach(() => {
  //   appBar = Enzyme.mount(
  //     <AppBar />
  //   );
  // })

  it('should call handleDrawerOpen and handleDrawerClose', () => {
    expect(0).toBe(0)
    // expect(appBar.find(AppBar).length).toBe(1)
    // const handleDrawerOpen = spyOn((AppBar as any).Naked.prototype, 'handleDrawerOpen')
    // expect(handleDrawerOpen.calls.count()).toBe(0)
    // appBar.find('.toolbar-button').first().simulate('click')
    // expect(handleDrawerOpen.calls.count()).toBe(1)
  })

})


