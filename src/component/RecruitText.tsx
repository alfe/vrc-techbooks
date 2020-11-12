import React from 'react'
import styled from 'styled-components'
import media from "styled-media-query";
import JoinButton from './JoinButton'

const RecruitText = React.memo(() => (
  <RecruitTextArea>
    {`こんにちは みみんくです

    今年2月 VRChat内でVRChatの技術を紹介しあう同人誌イベントを開催しました

    来場者の方からは
      「やってみたいことが増えた」
      「求めていたものが詰まった一冊を見つけた」
    といったお声をいただき

    出展者の方からは
      「書くきっかけになった」
      「予想外の数手に取ってもらえた」
    との言葉をいただき おかげさまで好評のうちに終えることができました


    開催してからしばらく経ちました
    その間にVRChatには当時存在しなかった技術が新たに生まれてきました

    特筆すべきはUDONとAvatars 3.0
    VRChatで可能なことがさらに広がり、今までできなかった表現や新たなギミックやゲーム性を持ったワールドもどんどんと増えてきています



    しかしながら、新たな要素を学ぶのはどんどん難しくなっています

    SDK3は日々更新され新たなAPIが加わる上に
    Unityに関する深い知識やプログラミング能力が前提条件として必要になりはじめました

    もちろん少し調べればわかる というものもあります
    初心者向けの記事を書いてくださる方のおかげで、初歩段階のものは手順通り行えば アップロードまでできるようになってきています

    しかし少し込み入ったことをしようとすると そもそもどこから調べればいいかすらさっぱり分からない……

    そんな技術に関する複雑な知識をまとめ、書き記す人が増えてほしい
    実現方法が広まって楽しいワールドがさらに増えてほしい
    そしてなにより、私が知りたい



    そんなわけで
    VRChatの技術同人誌即売会「 `}
    <StrongVRCTech>VRC技術市Ⅱ</StrongVRCTech>
    {` 」を開催することにしました

    そこで VRChatで使える技術を持った方にお願いがあります
    このイベントを通じて `}
    <StrongVRCTech>持てる知識を詰め込んだ1冊の技術書</StrongVRCTech>
    {` をつくっていただきたいのです

    出展するためのルールは ひとつだけ
    `}
    <Strong>VRChatに関係のある技術同人誌</Strong>
    {` であること

    ・ アバターの改変
    ・ ワールドのライティング設定
    ・ 自作シェーダーの解説
    ・ VRChatのためのツールの作り方
    ・ UDONやAvatars3.0取扱説明書 といったものだけでなく
    ・ アバター展示会を開催するためのノウハウ
    ・ ブース出展のドローコールを下げるコツ
    ・ UDONワールドを外部ゲームとして販売した体験記
    ・ etc……
    
    VRChatに関係する技術であればなんでもOK

    VRCの住人が試したくなる同人誌
    Visitorな人の助けになる本
    同士の民と技術交流するための魔導書
    そんな同人誌をぜひお書きいただきたいのです



    なるべく同人誌の作成に専念していただくため
    今回も `}
    <Strong>Web入稿</Strong>
    {` を用意し、Unityを開かずに会場へ反映されるようにしています

    入稿は `}
    <Strong>見本誌</Strong>
    {` と `}
    <Strong>お品書き</Strong>
    {` を用意して `}
    <Strong>ブラウザからアップロード</Strong>
    {` するだけ
    アップロード後 数分でテストワールドに反映されるので 確認や微調整もスムーズに行えます
    `}
    <Image />
    {`


    同人誌をつくるのが初めてで不安……という方向けに
    無料のWebサービスだけで入稿物を用意する動画も公開しています

    `}
    <DraftVideos />
    {`

    出展申込の締切は `}
    <Strong>12月20日（日）</Strong>
    {`
    そして、入稿締切は開催1週間前を予定してます
    年末年始のお正月休みのタイミングで ゆっくり書き始められるスケジュールです

    開催日は `}
    <Strong>2021年2月20日（土）～21日（日）</Strong>
    {` 
    場所はもちろん VRChat
    PCVR向けのワールドとなる予定ですが Quest対応も可能な限り行っていきます



    今回も技術同人誌のイベントのため アバターやアクセサリーそのものを入稿することはできません
    またVRChatで利用できないアセットやUnity2020でしか使えない機能を主軸とした本もご遠慮ください
    そして可能性は低いですが、申込が想定以上に多くなった場合 出展者数を制限する可能性がありますことをご了承ください



    もしVRChatの中で「それどうやってるの？」と 聞かれた経験があるならそれを書いてみてください

    VRCの住人が試したくなる技術の紹介
    これまで作ったものの技術解説と裏話
    もしくは 技術を高め磨きあうための魔導書染みた一冊
    そんな同人誌に出会うことを楽しみにしています

    すこしでも興味を持ったなら ぜひ下のボタンをクリックして申込をお願いします
    `}
    <Signature>みみんく (
      <a href="https://twitter.com/mmnk_vt"
        target="_blank"
        rel="external noopener noreferrer">
          @mmnk_vt
      </a>
      )
    </Signature>


    <JoinButton />
    {`

    `}
    <Strong>追伸</Strong>
    {`
    「あのことについてなら ちょっとは書けるかも？」
    もし 少しでもそう感じましたら ぜひ上のボタンをお申込みください

    技術を持っている人はいても 書こうとする人は100人に1人いるかどうか
    そのやり方を知っていて、同人誌にまとめようとする人、しかも日本語で、となると世界に1人しかいない可能性も十分あります

    前回開催時は「初めて同人誌を書いた」という方は おおよそ半分ほど
    読み応えのあるデビュー作や 知識の詰まった同人誌が並んだ光景を`}
    <a href="https://www.vrchat.com/home/launch?worldId=wrld_3a71aacd-b494-401f-a31b-da9735708d57"
        target="_blank"
        rel="external noopener noreferrer">
          前回のイベント会場
    </a>
    {`で見ることができます

    必要なのは文章力よりも、書いてみたいという気持ち
    その気持ちさえあれば大歓迎です

    あなたが知ってる 私の知らない世界やコアな知識を存分に語ってくれる一冊
    そんな同人誌を心よりお待ちしております

    `}
  </RecruitTextArea>
))
export default RecruitText;

const RecruitTextArea = styled.div`
  && {
    white-space: pre-line;
    text-align: left;
    width: 100%;
    max-width: 800px;
    margin: 1rem auto 3rem;
    background: rgba(255, 255, 255, .1);
    border-radius: 5px;
    line-height: 2;
    box-sizing: border-box;

    ${media.lessThan("medium")`
      padding: 2rem 0.5rem 3rem;
      font-size: 1rem;
    `}
    ${media.greaterThan("medium")`
      padding: 2rem 2rem 3rem 2rem;
      font-size: 1.2rem;
    `}
  }
  a {
    color: #26B6FF;
    margin: 0 .5rem;
  }
`;
const StrongVRCTech = styled.span`
  && {
    font-weight: 600;
    font-size: 1.2em;
    text-shadow: 0 0 8px #26B6FF, 0 0 4px #26B6FF;
  }
`;
const Strong = styled.span`
  && {
    font-weight: 600;
    font-size: 1.2em;
    text-shadow: 0 0 4px #000000;
  }
`;
const Signature =styled.p`
  && {
    text-align: right;
  }
`;

const Image = () => (
  <img
    width="800"
    height="400"
    style={{ width: '100%', height: 'auto' }}
    src="/img/draft-image.png"
    alt="見本誌とお品書きをアップロードするだけの入稿" />
);
const DraftVideos = () => (
  <ImgFlex>
    <Link href="https://www.youtube.com/watch?v=E_SFXeVr4YE">
      <StyledImg
        style={{ width: '100%', height: 'auto' }}
        width="1280"
        height="720"
        src="/img/59.jpg"
        alt="技術同人誌のつくりかた" />
    </Link>
    <Link href="https://www.youtube.com/watch?v=D1PWI_b8wN0">
      <StyledImg
        style={{ width: '100%', height: 'auto' }}
        width="1280"
        height="720"
        src="/img/60.jpg"
        alt="お品書きのつくりかた" />
    </Link>
  </ImgFlex>
);

const Link = ({ href, style, children }: { href: string, style: any, children: React.Children }) => (
  <a
    style={style}
    href={href}
    target="_blank"
    rel="noopener noreferrer">
    {children}
  </a>
);

const StyledImg = styled.img`
  && {
    box-shadow: 0 0 16px #ffffff, 0 0 4px #26B6FF;
    border-radius: 8px;
  }
  &&:hover, &&:active {
    box-shadow: none;
    transform: translate(1px, 1px);
    filter: brightness(0.75);
  }
  &&:active {
    filter: brightness(0.5);
  }
`;

const ImgFlex = styled.div`
  && {
    display: flex;
    justify-content: space-between;

    ${media.lessThan("medium")`
      flex-direction: column;
    `}
  }
  && > a {
    height: auto;

    ${media.lessThan("medium")`
      width: 90%;
      margin: auto;
    `}
    ${media.greaterThan("medium")`
      width: 45%;
    `}
  }
`;
