import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import Fade from '../services/transitions/fade.js';
import { motion, AnimatePresence } from 'framer-motion';

export class Loading extends Component {
  render() {
    let style = {
      background: '#eee',
      padding: '20px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center'
    };

    let iconStyle = {
      fontSize: '24px',
      padding: '8px'
    };

    return (
      <AnimatePresence>
        <motion.div initial="initial" animate="in" exit="out" variants={Fade}>
          <div style={style}>
            <Glyphicon style={iconStyle} glyph="time" /> Loading... please wait
            a moment...
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
}

export default connect()(Loading);
