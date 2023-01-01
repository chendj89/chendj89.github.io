export default function getIssueContent(body: string) {
  let format = '';
  let title = '';
  // 获得markdown中的粗体
  let titleReg = body.match(/(\*\*|__)(.*?)(\*\*|__)/);
  if (titleReg) {
    title = titleReg[2];
  }
  let code: any = '';
  let codeReg = body.match(/```([\s\S]*?)```[\s]*/);
  if (codeReg) {
    if (codeReg[1].startsWith('json')) {
      format = codeReg[1].slice(0, 4).trim();
      code = codeReg[1].slice(4).trim();
      try {
        code = JSON.parse(code);
        title = code.user;
      } catch (error) {
        console.log(error);
      }
    } else if (codeReg[1].startsWith('js')) {
      format = codeReg[1].slice(0, 2).trim();
      code = codeReg[1].slice(2).trim();
    }
  }
  return {
    title,
    code,
    body,
    format,
  };
}
