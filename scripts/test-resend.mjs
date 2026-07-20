/**
 * 测试 Resend API Key 是否有效
 * 用法: node scripts/test-resend.js <你的API密钥>
 *
 * 测试邮件会发送到 kldstone.china@gmail.com（也就是你自己）
 */

const API_KEY = process.argv[2];

if (!API_KEY) {
  console.error("用法: node scripts/test-resend.js <API_KEY>");
  process.exit(1);
}

if (!API_KEY.startsWith("re_")) {
  console.error("❌ API Key 格式错误，应以 re_ 开头");
  process.exit(1);
}

const testHtml = `
<h2>KLD Stone API Test</h2>
<p>This is a test email from the KLD Stone website contact API.</p>
<p>如果收到这封邮件，说明 Resend API Key 配置正确。</p>
<p>Time: ${new Date().toISOString()}</p>
`;

async function main() {
  console.log("正在测试 Resend API Key...");
  console.log(`Key: ${API_KEY.slice(0, 8)}...${API_KEY.slice(-4)}`);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "KLD Stone <onboarding@resend.dev>",  // 先用 Resend 默认域名
        to: "kldstone.china@gmail.com",
        subject: "KLD Stone — API Key 验证测试",
        html: testHtml,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("\n✅ API Key 有效！邮件已发送到 kldstone.china@gmail.com");
      console.log("   请检查收件箱（可能需要查看垃圾邮件）");
      console.log(`   邮件 ID: ${data.id}`);

      console.log("\n--- 下一步 ---");
      console.log("1. 在 Vercel 项目 Settings → Environment Variables 中添加：");
      console.log("   Name: RESEND_API_KEY");
      console.log(`   Value: ${API_KEY}`);
      console.log("   Environment: Production");
      console.log("2. 重新部署项目");
      console.log("3. 前往 https://resend.com/domains 添加你的域名 kldstone.com");
      console.log("   配置后修改 api/contact.mjs 中的 from 地址为你的域名");
    } else {
      console.error(`\n❌ 发送失败: ${data.statusCode || res.status}`);
      console.error(`   错误: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    console.error("\n❌ 网络错误:", err.message);
  }
}

main();
