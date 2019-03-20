import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity } from "react-native";

class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.data.text,
        };
    }
    render() {
        return <TouchableOpacity onPress={this.props.onPress} style={{ alignSelf: 'flex-start' }}><Text style={styles.text}>{this.state.text}</Text></TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    text: {
        color: "#212121",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10,
    }
});

MyButton.propTypes = {
    data: PropTypes.object.isRequired,
};

export default MyButton