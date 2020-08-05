import React, { Component } from 'react';
import { BsClock } from 'react-icons/bs';
import { connect } from 'react-redux';
import Fade from '../services/transitions/fade.js';
import { motion, AnimatePresence } from 'framer-motion';
import { IconContext } from 'react-icons';

export class Creating extends Component {
  render() {
    let style = {
      background: '#eee',
      padding: '20px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
    };

    let iconStyle = {
      fontSize: '24px',
      padding: '8px',
    };

    return (
      <AnimatePresence>
        <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
          <div style={style}>
            <IconContext.Provider value={{ size: '2em' }}>
              <div>
                <BsClock style={iconStyle} />
              </div>
            </IconContext.Provider>
            Creating... please wait a moment...
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
}

export default connect()(Creating);
