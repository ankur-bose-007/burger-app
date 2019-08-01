import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auxiliary from './hoc/Auxiliary';
function App() {
  return (
            <Auxiliary>
                <div>
                    <Layout>
                      <BurgerBuilder/>
                    </Layout>
                </div>
            </Auxiliary>
        );
}

export default App;
