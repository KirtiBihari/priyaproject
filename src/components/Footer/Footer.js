import React from 'react';
import './Footer.scss';
import { Container, Footer } from 'mdbreact';
import { CURRENT_YEAR } from '../../config/config';
const FooterC = () => {
  return (
    <Footer className="font-small grey darken-3">
      <div className="footer-copyright text-center py-2">
        <Container fluid>
          Copyright {CURRENT_YEAR} � TouchQlik Inc. All rights reserved
        </Container>
      </div>
    </Footer>
  );
};

export default FooterC;
