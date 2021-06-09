import { Segment, Dimmer, Loader } from 'semantic-ui-react';

const Spinner = () => {
  return (
    <Segment>
      <Dimmer active inverted>
        <Loader inverted content="Loading" />
      </Dimmer>
    </Segment>
  );
};

export default Spinner;
