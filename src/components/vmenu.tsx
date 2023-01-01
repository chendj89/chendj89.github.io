import type { PropType } from 'vue';
import issueApp from '@/tools/issue';
import getIssueContent from '@/tools/getIssueContent';
import { NThing, NAvatar, NH2, NCard, NSpace, NEllipsis, NA, NSkeleton, NIcon, NButton } from 'naive-ui';
import BiArrowUpShort from '~icons/bi/arrow-up-short';
import BiArrowDownShort from '~icons/bi/arrow-down-short';
import BiUiChecksGrid from '~icons/bi/ui-checks-grid';

import useDialog from '@/tools/useDialog';
import addIssue from './addIssue.vue';

export interface Info {
  name: string;
  icon: string;
  url: string;
  desc: string;
  group?: boolean;
  full?: boolean;
  [x: string]: any;
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
    const ins = getCurrentInstance();
    const list = ref<Info[]>([]);
    const updown = ref(0);
    const len = ref(0);
    onMounted(() => {
      app
        .request('GET ' + props.info.comments_url, {})
        .then((res) => res.json())
        .then((data) => {
          let arr:any[] = [];
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
          len.value = list.value.length;
        });
    });
    const upClick = () => {
      if (updown.value > 0) {
        updown.value--;
      }
    };
    const downClick = () => {
      if (updown.value < len.value - 1) {
        updown.value++;
      }
    };
    const setClick = () => {
      useDialog(addIssue, ins, { title: '添加issue' });
    };
    return { list, len, updown, upClick, downClick, setClick };
  },
  render(props: any) {
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
            'header-extra': () => (
              <NButton text onClick={this.setClick}>
                <NIcon size={14}>
                  <BiUiChecksGrid></BiUiChecksGrid>
                </NIcon>{' '}
              </NButton>
            ),
            default: () => (
              <>
                <div style="min-height: 33px;height: 33px;overflow: hidden;">
                  {this.list.length ? (
                    <div style={{ transform: `translateY(-${this.updown * 33}px)`, transition: 'all 0.5s' }}>
                      {this.list.map((item) => (
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
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style="min-height:28px;margin-top:5px;">
                      <NSpace style={spaceStyle}>
                        {new Array(7).fill(1).map(() => (
                          <NSkeleton width={28} height={28} sharp={false}></NSkeleton>
                        ))}
                      </NSpace>
                    </div>
                  )}
                </div>
                {this.len > 1 ? (
                  <div style="position:absolute;right:-11px;top:4px;cursor: pointer;">
                    <NButton text onClick={this.upClick} style={{ display: 'block', opacity: this.updown > 0 ? 1 : 0 }}>
                      <NIcon size={14} depth="3">
                        <BiArrowUpShort></BiArrowUpShort>
                      </NIcon>
                    </NButton>
                    <NButton text onClick={this.downClick} style={{ display: 'block', opacity: this.updown < this.len - 1 ? 1 : 0 }}>
                      <NIcon size={14} depth="3">
                        <BiArrowDownShort></BiArrowDownShort>
                      </NIcon>
                    </NButton>
                  </div>
                ) : null}
              </>
            ),
          }}
        </NThing>
      </NCard>
    );
  },
});
