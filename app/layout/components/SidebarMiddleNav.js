import React from 'react';

import { SidebarMenu } from './../../components';
import { simpleHttpRequest } from 'ag-grid-community';

export const SidebarMiddleNav = () => (
    <SidebarMenu>
        <SidebarMenu.Item icon={<i className="fa fa-fw fa-video-camera"></i>} title="Device">
            <SidebarMenu.Item title="Register" />
            <SidebarMenu.Item title="List" />
            <SidebarMenu.Item title="Management" />
        </SidebarMenu.Item>
        <SidebarMenu.Item icon={<i className="fa fa-fw fa-columns"></i>} title="Channel">
            <SidebarMenu.Item title="Register" />
            <SidebarMenu.Item title="List" />
        </SidebarMenu.Item>
        <SidebarMenu.Item icon={<i className="fa fa-fw fa-sitemap"></i>} title="Site" >
            <SidebarMenu.Item title="Register" />
            <SidebarMenu.Item title="List" />
        </SidebarMenu.Item>
        <SidebarMenu.Item icon={<i className="fa fa-fw fa-youtube-play"></i>} title="Monitoring">
            <SidebarMenu.Item title="Live" />
            <SidebarMenu.Item title="Playback" />
        </SidebarMenu.Item>

        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-edit"></i>}
            title="Example"
        >
            <SidebarMenu.Item title="Level2" >
                <SidebarMenu.Item title="Level3">
                    <SidebarMenu.Item title="Level4" level={4}>
                        <SidebarMenu.Item title="Level5" level={5}>
                            <SidebarMenu.Item title="Level6" level={6}>
                                <SidebarMenu.Item title="Level7-1" to='/dev' level={7} />
                                <SidebarMenu.Item title="Level7-2" to='/dev' level={7} />
                            </SidebarMenu.Item>
                        </SidebarMenu.Item>
                    </SidebarMenu.Item>
                </SidebarMenu.Item>
            </SidebarMenu.Item>
            <SidebarMenu.Item title="CloudWatch" to='/dev' exact />
            <SidebarMenu.Item title="Timebar" to='/timebar' exact />
            <SidebarMenu.Item title="System Summary" to='/system/summary' exact />
        </SidebarMenu.Item>

    </SidebarMenu >
);
