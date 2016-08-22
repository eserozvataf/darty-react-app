import * as React from 'react';

import { AppModel } from '../../models/AppModel.ts';
import * as Constants from '../../Constants.ts';

import { LinearTimeline } from './common/LinearTimeline.tsx';

export class EntriesByCategory extends React.Component<any, any> {

    public state: any;
    public model: any;

    constructor(props: any) {
        super(props);

        this.state = {
            datasource: null,
            error: false
        };

        this.model = new AppModel();
        this.updateDatasource(this.props.params.key, this.props.params.value);
    }

    public componentWillReceiveProps(nextProps: any) {
        this.updateDatasource(nextProps.params.key, nextProps.params.value);
    }

    public render() {
        if (this.state.error) {
            return (
                <div>An error occurred</div>
            );
        }

        if (this.state.datasource === null) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            <div>
                Entries By Category: {this.props.params.key}={this.props.params.value}

                <LinearTimeline datasource={this.state.datasource} datakey="entries" />
            </div>
        );
    }

    private updateDatasource(key: string, value: string) {
        this.model.getEntriesByCategory(key, value)
            .then((response) => { this.setState({ datasource: response, error: false }); })
            .catch((err) => { this.setState({ error: true }); });
    }

}