import type { PropType } from 'vue';
import issueApp from '@/tools/issue';
import getIssueContent from '@/tools/getIssueContent';
import { NThing, NAvatar, NH2, NText, NCard, NSpace, NEllipsis, NButton, NIcon, NA, NTabs, NTabPane } from 'naive-ui';
export interface Info {
  name: string;
  icon: string;
  url: string;
  desc: string;
  group?: boolean;
  full?: boolean;
}
export const Props = {
  /**
   * 信息
   */
  info: {
    type: Object as PropType<Info>,
    default: {
      name: '',
      icon: '',
      url: '',
      desc: '',
    },
  },
  /**
   * 列表
   */
  list: {
    type: Array as PropType<Info[]>,
  },
};
/**
 * 卡片样式
 */
const contentStyle = {
  '--n-padding-left': '10px',
  '--n-padding-bottom': '10px',
};
/**
 * 图标集合容器
 */
const descriptionStyle = {
  marginTop: '5px',
};
/**
 * 图标集合
 */
const spaceStyle = {
  lineHeight: 0,
  gap: '8px 10px',
};
/**
 * 用户名称
 */
const hStyle = {
  margin: 0,
  height: '28px',
  lineHeight: '28px',
};
/**
 * 描述样式
 */
const descStyle = {
  height: '20px',
  lineHeight: '20px',
};

let app = new issueApp();
export default defineComponent({
  props: Props,
  setup(props) {
    const list = ref<Info[]>([]);
    onMounted(() => {
      app
        .request('GET ' + props.info.comments_url, {})
        .then((res) => res.json())
        .then((data) => {
          let arr = [];
          let ob = [];
          data.map((item: any) => {
            const content = getIssueContent(item.body);
            if (arr.length >= 7) {
              ob.push(arr);
              arr = [];
            } else {
              arr.push({
                name: content.code.user,
                desc: content.code.desc,
                url: content.code.url,
                icon: content.code.avatar,
                color: content.code.color,
              });
            }
          });
          if (arr.length) {
            ob.push(arr);
          }
          list.value = ob;
        });
    });
    return { list };
  },
  render(props) {
    console.log(this.list);

    return (
      <NCard contentStyle={contentStyle}>
        <NThing contentStyle={descriptionStyle} style={{ lineHeight: 0 }}>
          {{
            avatar: () => <NAvatar size={48} src={props.info.icon}></NAvatar>,
            header: () => <NH2 style={hStyle}>{props.info.name}</NH2>,
            description: () => (
              <NEllipsis style={descStyle} lineClamp={1} tooltip={false} expandTrigger="click">
                {props.info.desc}
              </NEllipsis>
            ),
            default: () => (
              <div style="min-height: 33px;height: 33px;overflow: hidden;">
                <div style="transform: translateY(0px);transition: all 0.5s;">
                  {this.list &&
                    this.list.map((item) => {
                      <div style="min-height:28px;margin-top:5px;">
                        <NSpace style={spaceStyle}>
                          {item.map((cell) =>
                            cell.url ? (
                              <NA href={cell.url} target="_blank" style="display: inline-block;">
                                <NAvatar size={28} src={cell.icon} style={{ background: '#e5e5e5', padding: cell.color ? null : '4px' }}></NAvatar>
                              </NA>
                            ) : (
                              <NAvatar size={28} src={cell.icon}></NAvatar>
                            )
                          )}
                        </NSpace>
                      </div>;
                    })}
                </div>
              </div>
            ),
          }}
        </NThing>
      </NCard>
    );
  },
});
